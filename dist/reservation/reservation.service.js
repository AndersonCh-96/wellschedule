"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const Repository_1 = require("typeorm/repository/Repository");
const room_entity_1 = require("../room/entities/room.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const reservation_gateway_1 = require("./reservation.gateway");
const microsoft_graph_service_1 = require("../microsoft-graph/microsoft-graph.service");
let ReservationService = class ReservationService {
    reservationRepository;
    roomRepository;
    userRepository;
    reservationGateway;
    microsoftGraphService;
    constructor(reservationRepository, roomRepository, userRepository, reservationGateway, microsoftGraphService) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.reservationGateway = reservationGateway;
        this.microsoftGraphService = microsoftGraphService;
    }
    MapParticipants(participants) {
        return participants.map(participant => ({
            emailAddress: {
                address: participant.email
            }
        }));
    }
    async create(createReservationDto, userLogin) {
        console.log("Crearte", createReservationDto);
        const room = await this.roomRepository.findOne({ where: { id: createReservationDto.roomId } });
        if (!room) {
            throw new common_1.NotFoundException('Sala no encontrada');
        }
        const user = await this.userRepository.findOne({ where: { id: userLogin.id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const conflictRoom = this.reservationRepository.createQueryBuilder('reservation')
            .where('reservation.roomId =:roomId', { roomId: createReservationDto.roomId })
            .andWhere('reservation.startDate < :endDate AND reservation.endDate > :startDate', {
            endDate: createReservationDto.endDate,
            startDate: createReservationDto.startDate
        });
        const conflict = await conflictRoom.getOne();
        if (conflict) {
            throw new common_1.ForbiddenException('Sala no disponible en el horario seleccionado');
        }
        const event = {
            subject: createReservationDto.title,
            start: {
                dateTime: createReservationDto.startDate,
                timeZone: 'America/Guayaquil',
            },
            end: {
                dateTime: createReservationDto.endDate,
                timeZone: 'America/Guayaquil',
            },
            body: {
                contentType: 'HTML',
                content: createReservationDto.description,
            },
            attendees: this.MapParticipants(createReservationDto?.participants || []),
        };
        const result = await this.microsoftGraphService.createEvent(userLogin.email, event);
        const reservation = this.reservationRepository.create({
            title: createReservationDto.title,
            startDate: createReservationDto.startDate,
            endDate: createReservationDto.endDate,
            description: createReservationDto.description,
            room,
            user,
            participants: createReservationDto?.participants || [],
            meetingId: result.id,
        });
        const saveReservation = await this.reservationRepository.save(reservation);
        this.reservationGateway.emitCreated(saveReservation);
        return saveReservation;
    }
    async findAll(start, end) {
        const queryB = this.reservationRepository
            .createQueryBuilder("reservation")
            .leftJoinAndSelect("reservation.room", "room")
            .leftJoinAndSelect("reservation.user", "user")
            .where("reservation.status = :status", { status: true })
            .take(10).orderBy("reservation.startDate", "DESC");
        if (start && end) {
            queryB.andWhere("reservation.startDate BETWEEN :start AND :end", {
                start: new Date(start),
                end: new Date(end),
            });
        }
        return {
            data: await queryB.getMany()
        };
    }
    async findOne(id) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['room', 'user'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservación no encontrada');
        }
        return reservation;
    }
    async update(id, updateReservationDto) {
        const entryData = await this.reservationRepository.preload({
            id,
            ...updateReservationDto,
        });
        if (!entryData) {
            throw new common_1.NotFoundException('Reservación no encontrada');
        }
        return await this.reservationRepository.save(entryData);
    }
    async remove(id, userLogin) {
        const reservation = await this.reservationRepository.findOne({ where: { id }, relations: ['user'] });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservación no encontrada');
        }
        if (reservation.user.id !== userLogin.id) {
            throw new common_1.ForbiddenException('No tienes permiso para eliminar esta reservación');
        }
        await this.microsoftGraphService.deleteEvent(userLogin.email, reservation?.meetingId || '');
        await this.reservationRepository.delete(reservation.id);
        this.reservationGateway.emitDeleted(id);
        return {
            message: 'Reservación eliminada correctamente'
        };
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Repository_1.Repository,
        Repository_1.Repository,
        Repository_1.Repository,
        reservation_gateway_1.ReservationGateway,
        microsoft_graph_service_1.MicrosoftGraphService])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map
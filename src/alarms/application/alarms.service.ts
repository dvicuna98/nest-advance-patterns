import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './command/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    /* const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity,
    );
    return this.alarmRepository.save(alarm); */
    return this.commandBus.execute(createAlarmCommand);

  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

}

import { SystemConfigs } from './interfaces/SystemConfigs.interface';

const config: SystemConfigs = {
    // interval between lesson time slots ( 6 * 5 min = 30 min )
    intervalValue: 6,
    // lesson duration ( 12 * 5 min = 60 min )
    lessonDuration: 12,
    // elements taken for one page in getTeachersFreeSlots
    paginationLimit: 10
};

export default config;
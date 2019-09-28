import ServiceType from './ServiceType';

export default interface Service {
    name: string;
    definition: Function;
    type: ServiceType;
}

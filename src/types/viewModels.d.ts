declare module 'viewModels' {
  export interface IUploadViewModel {
    id?: string,
    travelDate: DateTime,
    travelNumber: number,
    driver: string,
    sign: string,
    vehicleType: string,
    operation: string,
    destine: string,
    boxNumber: number,
    stopNumber: number,
    numberKM: number,
    travelType: string,
    value: number;
  }

}

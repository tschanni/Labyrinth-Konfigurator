export class ServiceResponseDto<T> {
    constructor(
        data: T,
        success: boolean,
        message: string
    ) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
    
    data: T;
    success: boolean;
    message: string;
}

import { Request, Response } from 'express';
abstract class BaseController {
    protected abstract service: any;
    // Handle success response
    sendSuccessResponse(res: Response, message: String, data: Object) {
        res.status(200).json({ status: true, message: message, data: data });
    }

    // Handle error response
    sendErrorResponse(res: Response, message: String, data: Object) {
        res.status(400).json({ status: false, message: message, data: data });
    }

    // Handle internal server error
    sendInternalServerError(res: Response, message: String, data: Object) {
        res.status(500).json({ status: false, message: message, data: data });
    }

    sendCreatedResponse(res: Response, data: any) {
        res.status(201).json(data);
    }

    sendNoContentResponse(res: Response) {
        res.status(204).end();
    }

    sendNotFoundResponse(res: Response, message: string) {
        res.status(404).json({ message });
    }
}

export default BaseController;

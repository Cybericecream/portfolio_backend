import {Request, Response} from "express";
import {Dog} from "../entity/dogsEntity";


const listDogs = async (req: Request, res: Response): Promise<Response> => {
    let status = 500;
    let payload: any[] = [];
    let error: string[] = [];

    try {
        const allDogs: Dog[] = await Dog.findAll({
            where: {
                deletedAt: null
            }
        });
        if (allDogs !== null) {
            status = 200;
            payload.push(allDogs);
        } else {
            status = 204;
            error.push(`Unable to load entries`)
        }
    } catch (catchError) {
        error.push(`Failed to retrieve entries`);
    }

return res.status(status).json({
    payload: payload,
    error: error
});
}

const viewDogs = async (req: Request, res: Response): Promise<Response> => {

    let status = 500;
    let payload: any[] = [];
    let error: string[] = [];

    try {
        const {id} = req.params;
        const dog: Dog | null = await Dog.findByPk(id);
        if (dog !== null) {
            status = 200;
            payload.push(dog);
        } else {
            status = 204;
            error.push(`Unable to load ${req.url.substr(1)}`)
        }
    } catch (e: any) {
        error.push(e.message);
    }

    return res.status(status).json({
        payload: payload,
        error: error
    });
}

const saveDogs = async (req: Request, res: Response) => {
    
    let status = 500;
    let payload: any[] = [];
    let error: string[] = [];

    try {
        if (Object.keys(req.body).length === 0) {
            throw new Error('Please fill in form variables');
        }
        const dog: Dog = await Dog.create({
            name: req.body.name,
            breed: req.body.breed,
            isGoodBoy: req.body.isGoodBoy
        });
        if (dog !== null) {
            status = 201;
            payload.push(dog);
        } else {
            status = 400;
            error.push(`Unable to save`)
        }
    } catch (e: any) {
        error.push(e.message);
    }

    return res.status(status).json({
        payload: payload,
        error: error
    });
}

const editDogs = async (req: Request, res: Response): Promise<Response> => {
    
    let status = 500;
    let payload: any[] = [];
    let error: string[] = [];

    try {
        const {id} = req.params;
        if (Object.keys(req.body).length === 0) {
            throw new Error('Please fill in form variables');
        }
        const updatedDog: Dog | null = await Dog.findByPk(id);
        await Dog.update({
            name: req.body.name,
            breed: req.body.breed,
            isGoodBoy: req.body.isGoodBoy
        }, {where: {id}});
        if (updatedDog !== null) {
            status = 202;
            payload.push(updatedDog);
        } else {
            status = 400;
            error.push(`Unable to save`)
        }
    } catch (e: any) {
        error.push(e.message);
    }

    return res.status(status).json({
        payload: payload,
        error: error
    });
}

const deleteDogs = async (req: Request, res: Response): Promise<Response> => {
    
    let status = 500;
    let payload: any[] = [];
    let error: string[] = [];

    const { id } = req.params;
    try {
        const deletedDog: Dog | null = await Dog.findByPk(id);
        await Dog.update({deletedAt: Date.now()}, {where: {id}});
        if (deletedDog !== null) {
            status = 202;
            payload.push(deletedDog);
        } else {
            status = 400;
            error.push(`Unable to delete`)
        }
    } catch (e: any) {
        error.push(e.message);
    }

    return res.status(status).json({
        payload: payload,
        error: error
    });
}

module.exports = {
    listDogs,
    viewDogs,
    saveDogs,
    editDogs,
    deleteDogs
};
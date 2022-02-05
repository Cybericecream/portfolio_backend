import {Request, Response} from "express";
import {Dog} from "../entity/dogsEntity";

const listDogs = async (req: Request, res: Response): Promise<Response> => {
    const allDogs: Dog[] = await Dog.findAll({
        where: {
            deletedTime: null
        }
    });
    return res.status(200).json([allDogs]);
}

const viewDogs = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const dog: Dog | null = await Dog.findByPk(id);
    return res.status(200).json(dog);
}

const saveDogs = async (req: Request, res: Response) => {
    try {
        const dog: Dog = await Dog.create({
            name: req.body.name,
            breed: req.body.breed,
            isGoodBoy: req.body.isGoodBoy,
            createdTime: Date.now(),
            updatedTime: Date.now()
        });
        return res.status(201).json(dog);
    } catch (e: any) {
        return res.status(500).json({'error': e.message});
    }
}

const editDogs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            console.log('error?')
            throw new Error('Please fill in form variables');
        }
        await Dog.update({
            name: req.body.name,
            breed: req.body.breed,
            isGoodBoy: req.body.isGoodBoy,
            updatedTime: Date.now()
        }, {where: {id}});
        const updatedDog: Dog | null = await Dog.findByPk(id);
        return res.status(200).json(updatedDog);
    } catch (e: any) {
        return res.status(500).json({'error': e.message});
    }
}

const deleteDogs = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const deletedDog: Dog | null = await Dog.findByPk(id);
        await Dog.update({deletedTime: Date.now()}, {where: {id}});
        return res.status(200).json(deletedDog);
    } catch (e: any) {
        return res.status(500).json({'error': e.message});
    }
}

module.exports = {
    listDogs,
    viewDogs,
    saveDogs,
    editDogs,
    deleteDogs
};
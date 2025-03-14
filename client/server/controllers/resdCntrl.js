import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// Tạo một Residency mới
export const createResidency = asyncHandler(async (req, res) => {
    const { title, description, price, address, country, city, facilities, image, userEmail } = req.body;

    try {
        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: { connect: { email: userEmail } },
            }
        });

        res.status(201).json({ message: "Residency created successfully", residency });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy tất cả Residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    try {
        const residencies = await prisma.residency.findMany({
            orderBy: { createdAt: "desc" }
        });

        res.status(200).json(residencies);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch residencies" });
    }
});

// Lấy một Residency theo ID
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const residency = await prisma.residency.findUnique({
            where: { id },
        });

        if (!residency) {
            return res.status(404).json({ error: "Residency not found" });
        }

        res.status(200).json(residency);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
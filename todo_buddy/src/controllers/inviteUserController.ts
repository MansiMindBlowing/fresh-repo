import { AppDataSource } from '../connection/database'
import { Request, Response } from 'express';
import { User } from '../models/user';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const invitedUser = async (req: Request, res: Response) => {

    const { email, name, role } = req.body;
     const userId = (req as any).user?.id;
     
    try {
        const userRepo = AppDataSource.getRepository(User)
        const alreadyUser = await userRepo.findOne({ where: { email } })
        if (alreadyUser) {
            return res.status(400).json({ message: 'user exists' })
        }

        const password = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepo.create({
            name, email, password: hashedPassword, role,  invited_by: userId,
        });

        await userRepo.save(newUser);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'You have been invited!',
            html: `
        <h2>Welcome, ${name}!</h2>
        <p>You’ve been invited to join our system as <strong>${role}</strong>.</p>
        <p>Your temporary login credentials are:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>Please login and change your password immediately.</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(201).json({ message: 'error' });

    } catch (error) {
        console.log('Invite error:', error);

        return res.status(500).json({ message: 'server error' })
    }
}
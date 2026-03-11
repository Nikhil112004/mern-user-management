import { Parser } from 'json2csv';
import { User } from '../models/User.js';
import { parseArgs } from 'util';

export const exportUserCSV = async (req: any, res: any) => {
    try {
        const users = await User.find().lean();

        const fields = [
            "firstName",
            "lastName",
            "email",
            "mobile",
            "gender",
            "status",
            "location"   
        ];
        const parser = new Parser({fields});
        const csv = parser.parse(users);

        res.header("Content-Type", "text/csv");
        res.attachment("users.csv");
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: "Error exporting CSV"});
    }
};

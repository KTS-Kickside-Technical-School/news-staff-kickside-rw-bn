import inquiryRepository from "../repository/inquiryRepository";

export const checkInquiryExist = async (req: any, res: any, next: any) => {
    try {
        const { id } = req.params;
        console.log("ID", id)
        const inquiry = await inquiryRepository.findInquiryByAttribute("_id", id);
        if (!inquiry) {
            return res.staus(404).json({
                status: 404,
                message: "Inquiry Not Found"
            })
        };
        req.inquiry = inquiry
        next();
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        })
    }
}
export default {
    checkInquiryExist
}
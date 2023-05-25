import { useBuyInDataAddAPI } from "../api/buyin";
import { createLogger } from "../common/commonLogger";
import { BuyInData } from "../models/buyIn";
import { isSuccess } from "./utils";

const buyInServiceLogger = createLogger('services/buyIn');

export const useBuyInDataAddService = () =>{
    const {send:buyInAddAPI} = useBuyInDataAddAPI();

    const buyInAddService = async(data:BuyInData) =>{
        try{
            const res = await buyInAddAPI(data);
            if(isSuccess(res)&& res.data){
                return res.data;
            }
            return null;
        }catch{
            buyInServiceLogger.error('buyInDataAdd failed',data);
            return null;
        }
    }

    return buyInAddService;
}
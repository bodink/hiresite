import { createContext, useContext, useEffect, useState } from "react";
import Medusa from "@medusajs/medusa-js";

const medusa_baseUrl = `http://localhost:9000`;

const MedusaContext = createContext();


export const useMedusa = () => useContext(MedusaContext);


export const MedusaProvider = ({ children }) => {
    const [medusa, setMedusa] = useState(null);

    useEffect(() => {
        const medusaInstance = new Medusa({
            maxRetries: 3,
            baseUrl: medusa_baseUrl,
        })
        setMedusa(() => medusaInstance);

        return () => {
            setMedusa(null);
        }
    }, []);

    let value = {
        medusa
    }

    return (
        <MedusaContext.Provider value={value} >
            {children}
        </MedusaContext.Provider>
    )
}
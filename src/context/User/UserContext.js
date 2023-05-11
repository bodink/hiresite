import { createContext, useState, useEffect, useContext } from "react";
import { useMedusa } from "../medusa/MedusaContext";
import { website_region } from "../../environmentVariables/env";


const UserContext = createContext();


export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [region, setRegion] = useState(null);
    const { medusa } = useMedusa();

    useEffect(() => {
        // fetch and update user

        // For testing
    }, []);

    useEffect(() => {
        if (!medusa) return;

        medusa.regions.list()
            .then(({ regions }) => {
                setRegion(() => regions.find(r => r.name === website_region));
            })
    }, [medusa]);

    // testing
    // useEffect(() => {
    //     console.log(region);
    // }, [region])

    let value = {
        user,
        region
    }

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}
import { useEffect,useState } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import NameAnalyzer from './components/NameAnalyzer';

export default function App(){
    return (
        <ChakraProvider value={defaultSystem}>
            <NameAnalyzer />
        </ChakraProvider>
    );
}
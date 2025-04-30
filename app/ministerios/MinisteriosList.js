"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import useAppStore from "../../store";
import MinisteriosHeader from "./MinisteriosHeader";

export default function MinisteriosList({ iglesiaId, iglesiaNombre }) {
  const [obreros, setObreros] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control del modal
  const setMinisterioSeleccionado = useAppStore(
    (state) => state.setMinisterioSeleccionado
  );
  const setObrerosCount = useAppStore((state) => state.setObrerosCount);
  const setCandidatosCount = useAppStore((state) => state.setCandidatosCount);

  useEffect(() => {
    const fetchMinisterios = async () => {
      try {
        const response = await fetch(`/api/ministerios/${iglesiaId}`);
        const data = await response.json();

        const obrerosList = data.filter(
          (ministerio) =>
            !["Ensayista", "Candidato local", "Candidato nacional"].includes(
              ministerio.cargos
            )
        );
        const candidatosList = data.filter((ministerio) =>
          ["Ensayista", "Candidato local", "Candidato nacional"].includes(
            ministerio.cargos
          )
        );

        setObreros(obrerosList);
        setCandidatos(candidatosList);

        // Actualizar los contadores en la store
        setObrerosCount(obrerosList.length);
        setCandidatosCount(candidatosList.length);
      } catch (error) {
        console.error("Error al obtener ministerios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinisterios();
  }, [iglesiaId, setObrerosCount, setCandidatosCount]);

  if (loading) {
    return (
      <Text fontSize="lg" textAlign="center">
        Cargando ministerios...
      </Text>
    );
  }

  const renderMinisterios = (ministerios) =>
    ministerios.map((ministerio) => (
      <GridItem key={ministerio.id}>
        <Card>
          <CardHeader>
            <Flex alignItems="center" gap="4">
              <Avatar
                name={`${ministerio.nombre} ${ministerio.apellidos}`}
                size="md"
                bg="teal.500"
                sx={{ appearance: "none" }}
              />
              <Box>
                <Heading size="sm" color="#2d3748">
                  {ministerio.nombre} {ministerio.apellidos}
                </Heading>
                <Text fontSize="xs" color="#4a5568">
                  {ministerio.cargos || "Sin cargos"}
                </Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                setMinisterioSeleccionado(ministerio);
                onOpen(); // Abrir modal
              }}
            >
              Ver Detalles
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    ));

  return (
    <Box padding="20px">
      <Heading size="lg" mb="4" color="#42518c">
        Obreros
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="6">
        {renderMinisterios(obreros)}
      </Grid>

      <Heading size="lg" mt="8" mb="4" color="#42518c">
        Candidatos
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="6">
        {renderMinisterios(candidatos)}
      </Grid>
    </Box>
  );
}

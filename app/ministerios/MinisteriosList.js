"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Button,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import styled from "styled-components";
import useAppStore from "../../store";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export default function MinisteriosList({ iglesiaId }) {
  const [ministerios, setMinisterios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMinisterio, setSelectedMinisterio] = useState(null);
  const setMinisterioSeleccionado = useAppStore(
    (state) => state.setMinisterioSeleccionado
  );

  useEffect(() => {
    const fetchMinisterios = async () => {
      try {
        const response = await fetch(`/api/ministerios/${iglesiaId}`);
        const data = await response.json();
        setMinisterios(data);
      } catch (error) {
        console.error("Error al obtener ministerios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinisterios();
  }, [iglesiaId]);

  const handleOpenModal = (ministerio) => {
    setSelectedMinisterio(ministerio);
    setMinisterioSeleccionado(ministerio);
    onOpen();
  };

  if (loading) {
    return (
      <Text fontSize="lg" textAlign="center">
        Cargando ministerios...
      </Text>
    );
  }

  if (ministerios.length === 0) {
    return (
      <Text fontSize="lg" textAlign="center">
        No hay ministerios disponibles.
      </Text>
    );
  }

  return (
    <>
      <FlexContainer>
        {ministerios.map((ministerio) => (
          <Card
            key={ministerio.id}
            width="300px"
            border="1px solid #e2e8f0"
            borderRadius="12px"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
            padding="4"
          >
            <CardHeader>
              <Heading size="md" textAlign="center" color="#2d3748">
                {ministerio.nombre} {ministerio.apellidos}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="#4a5568" mb="4">
                <strong>Cargos:</strong> {ministerio.cargos || "Sin cargos"}
              </Text>
              <Button
                colorScheme="blue"
                bg="#42518c"
                color="white"
                _hover={{ bg: "#2c3a6c" }}
                width="100%"
                onClick={() => handleOpenModal(ministerio)}
              >
                Ver Detalles
              </Button>
            </CardBody>
          </Card>
        ))}
      </FlexContainer>

      {selectedMinisterio && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalles del Ministerio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <strong>Nombre:</strong> {selectedMinisterio.nombre}{" "}
                {selectedMinisterio.apellidos}
              </Text>
              <Text>
                <strong>Alias:</strong> {selectedMinisterio.alias}
              </Text>
              <Text>
                <strong>Año de Aprobación:</strong> {selectedMinisterio.aprob}
              </Text>
              <Text>
                <strong>Código:</strong> {selectedMinisterio.codigo}
              </Text>
              <Text>
                <strong>Teléfono:</strong> {selectedMinisterio.telefono}
              </Text>
              <Text>
                <strong>Email:</strong> {selectedMinisterio.email}
              </Text>
              <Text>
                <strong>Cargos:</strong>{" "}
                {selectedMinisterio.cargos || "Sin cargos"}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

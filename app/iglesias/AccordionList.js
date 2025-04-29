import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation"; // Importar el router
import useAppStore from "../../store"; // Importar la store
import AccordionGMIEF from "../components/GmiefUI/AccordionGMIEF";

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: #42518c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function AccordionList({ iglesias }) {
  const [subzonas, setSubzonas] = useState({});
  const router = useRouter(); // Instanciar el router
  const setIglesiaSeleccionada = useAppStore(
    (state) => state.setIglesiaSeleccionada
  ); // Obtener acción de la store

  useEffect(() => {
    const fetchSubzonas = async () => {
      const subzonaIds = [
        ...new Set(iglesias.map((iglesia) => iglesia.subzona_id)),
      ];
      const subzonaData = {};

      for (const id of subzonaIds) {
        try {
          const res = await fetch(`/api/subzonas/${id}`);
          if (res.ok) {
            const data = await res.json();
            subzonaData[id] = data.nombre;
          } else {
            console.error(`Error al obtener subzona con id ${id}`);
          }
        } catch (err) {
          console.error(err);
        }
      }

      setSubzonas(subzonaData);
    };

    fetchSubzonas();
  }, [iglesias]);

  const handleGestionarMinisterios = (iglesia) => {
    setIglesiaSeleccionada(iglesia); // Actualizar la iglesia seleccionada en la store
    router.push("/ministerios"); // Redirigir a la página de ministerios
  };

  const accordionItems = iglesias.map((iglesia) => ({
    title: `${iglesia.nombre} `,
    subtitle: `| ${subzonas[iglesia.subzona_id] || "Cargando..."}`,
    content: (
      <>
        <p>
          <strong>Dirección:</strong>{" "}
          {`${iglesia.direccion}, ${iglesia.municipio}, ${iglesia.provincia}, ${iglesia.cp}`}
        </p>

        <StyledButton onClick={() => handleGestionarMinisterios(iglesia)}>
          Gestionar Ministerios
        </StyledButton>
      </>
    ),
  }));

  return <AccordionGMIEF items={accordionItems} />;
}

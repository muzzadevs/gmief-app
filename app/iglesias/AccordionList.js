import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import useAppStore from "../../store";
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
  const subzonasRef = useRef({});
  const router = useRouter();
  const setIglesiaSeleccionada = useAppStore(
    (state) => state.setIglesiaSeleccionada
  );

  useEffect(() => {
    const fetchSubzonas = async () => {
      if (!iglesias || iglesias.length === 0) return; // No ejecutar si no hay iglesias

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

      console.log("Subzonas cargadas:", subzonaData); // Depuración
      setSubzonas(subzonaData);
      subzonasRef.current = subzonaData;
    };

    fetchSubzonas();
  }, [iglesias]);

  const handleGestionarMinisterios = (iglesia) => {
    setIglesiaSeleccionada(iglesia);
    router.push("/ministerios");
  };

  const sortedIglesias = [...iglesias].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  const accordionItems = sortedIglesias.map((iglesia) => {
    const subzonaNombre = subzonas[iglesia.subzona_id] || "Cargando...";
    return {
      title: `${iglesia.nombre}`,
      subtitle: `| ${subzonaNombre}`,
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
    };
  });

  return <AccordionGMIEF items={accordionItems} />;
}

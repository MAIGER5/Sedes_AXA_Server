import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react';

export const ListCenter = () => {

  const [sedes, setSedes] = useState([]);
  const [filter1, setFilter1] = useState('');  // Filtro de departamento
  const [filter2, setFilter2] = useState('');  // Filtro de municipio

  useEffect(() => {
      fetch('/data/red_urgencias_axa.json') // Cambia esta ruta según la ubicación de tu archivo
          .then(response => response.json())
          .then(data => {
              setSedes(data);
          })
          .catch(error => console.error('Error cargando el archivo JSON:', error));
  }, []);

  const depart = sedes.map((el) => el.departamento);
  const departOnly = [...new Set(depart)];

  // Filtrar los municipios con base en el departamento seleccionado
  const cityFilteredByDepartment = sedes
    .filter((el) => el.departamento === filter1) // Filtrar los municipios por el departamento seleccionado
    .map((el) => el.municipio);
    
  const cityOnly = [...new Set(cityFilteredByDepartment)];

  // Filtrar los datos en base a los dos filtros seleccionados (departamento y municipio)
  const dataFilter = sedes.filter(item => {
    return (
      (filter1 ? item.departamento === filter1 : true) &&
      (filter2 ? item.municipio === filter2 : true)
    );
  });

  // Si sólo hay un departamento seleccionado, mostrar todas las sedes de ese departamento
  const dataFilterByDepartment = sedes.filter(item => {
    return (
      filter1 ? item.departamento === filter1 : true
    );
  });

  return (
    <IonContent color="light">
      {/* Filtro de Departamentos */}
      <IonList>
        <IonItem>
          <IonSelect 
            value={filter1}
            onIonChange={e => {
              setFilter1(e.detail.value);
              setFilter2(''); // Reiniciar el filtro de municipio al cambiar el departamento
            }}
            aria-label="Departamento" 
            placeholder="Selecciona un Departamento"
          >
            {
              departOnly.sort().map((el, index) => (
                <IonSelectOption 
                  key={index} 
                  value={el}
                >{el}</IonSelectOption>
              ))
            }
          </IonSelect>
        </IonItem>
      </IonList>

      {/* Filtro de Municipios, solo muestra los municipios del departamento seleccionado */}
      <IonList>
        <IonItem>
          <IonSelect 
            value={filter2}
            onIonChange={e => setFilter2(e.detail.value)}
            aria-label="Municipio" 
            placeholder="Selecciona un Municipio"
            disabled={!filter1} // Habilitado solo si se selecciona un departamento
          >
            {
              cityOnly.sort().map((el, index) => (
                <IonSelectOption 
                  key={index} 
                  value={el}
                >{el}</IonSelectOption>
              ))
            }
          </IonSelect>
        </IonItem>
      </IonList>

      {/* Resultados filtrados */}
      <IonList inset={true}>
        {
          (filter2 ? dataFilter : dataFilterByDepartment).length > 0 ? (
            (filter2 ? dataFilter : dataFilterByDepartment).map((el) => (
              <IonCard key={el.id}>
                <IonCardHeader>
                  <IonCardTitle style={{ fontSize: 'clamp(0.9rem, 2vw, 1.5rem)' }}>{el.sede}</IonCardTitle>
                  <IonCardSubtitle style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}>{el.tipo}</IonCardSubtitle>
                </IonCardHeader>
                
                <IonCardContent style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>{el.direccion}</IonCardContent>
                <IonCardContent style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>{el.telefono}</IonCardContent>

                <IonButton fill="clear" style={{ fontSize: '12px' }}>{el.departamento}</IonButton>
                <IonButton fill="clear" style={{ fontSize: '12px' }}>{el.municipio}</IonButton>
              </IonCard>
            ))
          ) : (
            <IonItem>
              <IonLabel>No se encontraron resultados</IonLabel>
            </IonItem>
          )
        }
      </IonList>
    </IonContent>
  );
};

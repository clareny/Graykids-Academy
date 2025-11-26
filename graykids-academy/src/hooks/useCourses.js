import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, firebaseConfigured } from '../config/firebase';

const COURSES_STORAGE_KEY = 'coursesInfo';

const defaultCoursesInfo = {
  'curso-voces': {
    name: 'Mezcla y Grabación de Voces',
    description: 'Nivel Avanzado. Aprende técnicas profesionales para grabar y mezclar voces como los grandes productores. Domina el proceso completo desde la grabación hasta la mezcla final con estándares de la industria.',
    level: 'Avanzado',
    price: 99.99,
    icon: '🎤',
    videos: '60+',
    hours: '12+ Horas',
    status: 'available',
    presentationVideoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  },
  'curso-maquetizacion': {
    name: 'Maquetización Composicional',
    description: 'Nivel Intermedio. Domina el arte de estructurar y organizar tus composiciones musicales. Aprende a crear arreglos profesionales y maquetas que conecten con tu audiencia desde el primer segundo.',
    level: 'Intermedio',
    price: 89.99,
    icon: '🎹',
    videos: '50+',
    hours: '10+ Horas',
    status: 'coming-soon',
    presentationVideoUrl: 'https://www.youtube.com/watch?v=Vx2xTI4_7oA'
  },
  'curso-beats': {
    name: 'Programación de Beats',
    description: 'Nivel Intermedio. Aprende a programar beats profesionales desde cero. Domina la creación de ritmos, patrones de batería y técnicas avanzadas de programación que harán que tus producciones destaquen.',
    level: 'Intermedio',
    price: 79.99,
    icon: '🎛️',
    videos: '55+',
    hours: '11+ Horas',
    status: 'coming-soon',
    presentationVideoUrl: 'https://www.youtube.com/watch?v=4TnQq0FJ4sI'
  }
};

export const useCourses = () => {
  const [courses, setCourses] = useState(defaultCoursesInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      // Cargar cursos desde localStorage primero
      try {
        const stored = localStorage.getItem(COURSES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setCourses({ ...defaultCoursesInfo, ...parsed });
        }
      } catch (error) {
        console.warn('No se pudo leer coursesInfo desde localStorage:', error);
      }

      // Intentar cargar desde Firebase si está configurado
      if (firebaseConfigured && db) {
        try {
          const snapshot = await getDocs(collection(db, 'courses'));
          const remoteData = {};
          snapshot.forEach(docSnap => {
            remoteData[docSnap.id] = {
              ...docSnap.data()
            };
          });

          if (Object.keys(remoteData).length > 0) {
            const localData = JSON.parse(localStorage.getItem(COURSES_STORAGE_KEY) || '{}');
            const mergedData = { ...defaultCoursesInfo, ...localData, ...remoteData };
            setCourses(mergedData);
            localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(mergedData));
          }
        } catch (error) {
          console.error('No se pudieron obtener los cursos desde Firestore:', error);
        }
      }

      setLoading(false);
    };

    loadCourses();
  }, []);

  return { courses, loading };
};


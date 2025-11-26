import React from 'react';
import { useCourses } from '../hooks/useCourses';

const Courses = () => {
  const { courses, loading } = useCourses();
  const defaultCourseIds = ['curso-voces', 'curso-maquetizacion', 'curso-beats'];

  return (
    <section id="cursos" className="courses">
      <div className="courses__container container">
        <h3 className="courses__title">Cursos más populares</h3>
        
        <div className="courses__grid" id="popularCoursesContainer">
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
              Cargando cursos...
            </p>
          ) : (
            defaultCourseIds.map(courseId => {
              const course = courses[courseId];
              if (!course) return null;
              
              const isAvailable = course.status === 'available' || course.status === undefined;
              
              return (
                <article key={courseId} className="course-card" data-course-id={courseId}>
                  <div className="course-card__image">
                    <div className="course-card__placeholder">
                      <span className="course-card__icon">{course.icon || '🎓'}</span>
                    </div>
                  </div>
                  <div className="course-card__content">
                    <h4 className="course-card__title">{course.name}</h4>
                    <p className="course-card__description">{course.description}</p>
                    {isAvailable ? (
                      <a href="#contacto" className="btn btn--secondary">Más info</a>
                    ) : (
                      <span className="btn btn--secondary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                        Próximamente
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="courses__view-all">
          <a href="/cursos?available=true" className="btn btn--outline">Ver todos los cursos</a>
        </div>
      </div>
    </section>
  );
};

export default Courses;


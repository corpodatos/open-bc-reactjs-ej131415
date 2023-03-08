import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import NIVEL from "../models/nivel.enum";
import { Task } from "../models/task.class";

const TaskForm = () => {
  const [tarea, setTarea] = useState([]);

  const tareaSchema = Yup.object().shape({
    nombre: Yup.string().required("Requerido"),
    descripcion: Yup.string().required("Requerido"),
  });

  return (
    <div>
      <h1>Crear Tarea</h1>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          nivel: NIVEL.NORMAL,
        }}
        validationSchema={tareaSchema}
        onSubmit={(values, actions) => {
          const tmpTareas = [...tarea];
          tmpTareas.push(values);
          setTarea(tmpTareas);
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="nombre" />
            {errors.nombre && touched.nombre ? (
              <div>{errors.nombre}</div>
            ) : null}
            <Field name="descripcion" />
            {errors.descripcion && touched.descripcion ? (
              <div>{errors.descripcion}</div>
            ) : null}
            <Field as="select" name="nivel">
              <option value={NIVEL.NORMAL}>{NIVEL.NORMAL}</option>
              <option value={NIVEL.URGENTE}>{NIVEL.URGENTE}</option>
              <option value={NIVEL.BLOQUEO}>{NIVEL.BLOQUEO}</option>
            </Field>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      {tarea.length > 0 ? (
        <h1>Listado de Tareas</h1>
      ) : (
        <h3>No existen tareas</h3>
      )}

      {tarea.map((tarea, indice) => {
        return (
          <div key={indice}>
            <h1>{tarea.nombre}</h1>
            <p>{tarea.descripcion}</p>
            <p>{tarea.nivel}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskForm;

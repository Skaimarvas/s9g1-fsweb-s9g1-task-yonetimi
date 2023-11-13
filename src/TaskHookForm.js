import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const empty = {
  title: "",
  description: "",
  people: "",
};

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...empty },
    mode: "all",
  });

  const formsubmit = (formData, e) => {
    console.log("Form Data :", formData);
    toast.success("Yeni Görev Eklendi");
    submitFn({ ...formData, id: nanoid(5), status: "yapılacak" });
    e.target.reset();
  };

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(formsubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            {" "}
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            type="text"
            {...register("title", {
              required: "Task başlığı yazmalsınız",
              minLength: {
                value: 3,
                message: "Task başlığı en az 3 karakter olmalı",
              },
            })}
          />

          <p className="input-error"> {errors?.title?.message} </p>
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            id="description"
            rows="3"
            {...register("description", {
              required: "Task açıklaması yazmalasınız",
              minLength: {
                value: 10,
                message: "Task açıklaması en az 10 karakter olmalı",
              },
            })}
          />
          <p className="input-error">{errors?.description?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar </label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  value={p}
                  {...register("people", {
                    required: "En az bir seçenek seçmelisiniz",
                  })}
                />
                {p}
              </label>
            ))}
          </div>
          <p className="input-error"> {errors?.people?.message} </p>
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit" disabled={!isValid}>
            {" "}
            Kaydet{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

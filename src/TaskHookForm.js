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

  const formsubmit = (formData) => {
    console.log("Form Data :", formData);
    toast.success("Submit edildi.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formsubmit)}>
        <div>
          <label>
            {" "}
            Başlık
            <input
              type="text"
              {...register("title", {
                required: "Task başlığı yazmalsınız",
                minLength: {
                  value: 3,
                  message: "Task başlığı en az 3 karakter olmalı",
                },
              })}
            />
          </label>
        </div>
        <div>
          <p> {errors?.title?.message} </p>
        </div>
        <div>
          <label>
            Açıklama
            <textarea
              rows="3"
              {...register("description", {
                required: "Task açıklaması yazmalasınız",
                minLength: {
                  value: 10,
                  message: "Task açıklaması en az 10 karakter olmalı",
                },
              })}
            />
          </label>
        </div>
        <div>{errors?.description?.message}</div>
        <div>
          <div>
            <label>İnsanlar </label>
            <div>
              {kisiler.map((p) => (
                <label key={p}>
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
          </div>
          <button type="submit"> Kaydet </button>
        </div>
      </form>
    </div>
  );
}

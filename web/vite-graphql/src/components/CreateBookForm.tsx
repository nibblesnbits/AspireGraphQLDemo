import { Controller, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Autocomplete from "./Autocomplete";
import "./Autocomplete.css";

const FormSchema = z.object({
  title: z.string(),
  authorId: z.string(),
});

export type CreateBookFormInputs = z.infer<typeof FormSchema>;

export default function CreateBookForm({
  onSubmitForm,
  search,
  authorId,
}: {
  onSubmitForm: (data: CreateBookFormInputs) => void;
  search: (term: string) => Promise<{ id: string; name: string }[]>;
  authorId?: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBookFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      authorId: authorId || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* include validation with required or other standard HTML validation rules */}
      <label>Title</label>
      <input {...register("title", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.title && <span>This field is required</span>}

      {authorId ? null : (
        <Controller
          name="authorId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              value={field.value}
              onChange={field.onChange}
              onSearch={search}
              label="Author"
              placeholder="Search authors..."
              error={error}
            />
          )}
        />
      )}

      <input type="submit" />
    </form>
  );
}

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./Autocomplete.css";

const FormSchema = z.object({
  name: z.string(),
  bookId: z.string(),
});

export type CreateCharacterFormInputs = z.infer<typeof FormSchema>;

export default function CreateCharacterForm({
  onSubmitForm,
}: {
  onSubmitForm: (data: CreateCharacterFormInputs) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharacterFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      bookId: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* include validation with required or other standard HTML validation rules */}
      <label>Name</label>
      <input {...register("name", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// GraphQL schema: input AuthorInput { name: String! }
const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateAuthorFormInputs = z.infer<typeof FormSchema>;

export default function CreateAuthorForm({
  onSubmitForm,
}: {
  onSubmitForm: (data: CreateAuthorFormInputs) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAuthorFormInputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <label htmlFor="author-name">Author name</label>
      <input
        id="author-name"
        {...register("name", { required: true })}
        placeholder="e.g. Jane Doe"
      />
      {errors.name && <span role="alert">{errors.name.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Author"}
      </button>
    </form>
  );
}

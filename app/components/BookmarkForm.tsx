"use client";

import { useState } from "react";
import styles from "./BookmarkForm.module.css";

interface Props {
  onBookmarkAdded: () => void;
}

export default function BookmarkForm({ onBookmarkAdded }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        url,
        description,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");
    setLoading(false);
    onBookmarkAdded();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Adicionar Link</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="url"
        placeholder="URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
      />

      <input
        type="text"
        placeholder="Tags separadas por vírgula (ex: design, dev)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={styles.input}
      />

      <button
        type="submit"
        disabled={loading}
        className={styles.button}>
  <span>{loading ? "Salvando..." : "Salvar Link"}</span>
</button>
    </form>
  );
}
//Anotações pra estudo:
// O componente BookmarkForm é responsável por renderizar o formulário de criação de um novo bookmark. 
// Ele gerencia os estados dos campos do formulário e, ao ser submetido, envia uma requisição POST para a API para criar o bookmark. 
// Após a criação, ele limpa os campos e chama a função onBookmarkAdded para atualizar a lista de bookmarks.
"use client";

import { useEffect, useState } from "react";
import BookmarkForm from "./BookmarkForm";
import BookmarkCard from "./BookmarkCard";
import styles from "./BookmarkList.module.css";

interface Tag {
  tag: { id: number; name: string };
}

interface Bookmark {
  id: number;
  title: string;
  url: string;
  description: string | null;
  favorite: boolean;
  createdAt: string;
  tags: Tag[];
}

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState("");

  async function fetchBookmarks() {
    const res = await fetch("/api/bookmarks");
    const data = await res.json();
    setBookmarks(data);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/bookmarks/${id}`, { method: "DELETE" });
    fetchBookmarks();
  }

  async function handleFavorite(id: number, favorite: boolean) {
    await fetch(`/api/bookmarks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite }),
    });
    fetchBookmarks();
  }

  const filtered = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
     <div>
    <header className={styles.header}>
      <h1 className={styles.logo}>Link-Vault</h1>
    </header>

    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <BookmarkForm onBookmarkAdded={fetchBookmarks} />
      </aside>

      <section className={styles.content}>
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        {filtered.length === 0 ? (
          <p className={styles.empty}>Nenhum bookmark encontrado.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onDelete={handleDelete}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  </div>
  );
}
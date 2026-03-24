"use client";

import styles from "./BookmarkCard.module.css";

interface Tag {
  tag: { id: number; name: string };
}
//Anotações de codigo, esse codigo faz a interface do bookmark, onde tem o id, titulo, url, descrição, se é favorito ou não, data de criação e as tags associadas.
// A interface Props define as propriedades que o componente BookmarkCard espera receber: um objeto bookmark do tipo Bookmark, 
// uma função onDelete para deletar o bookmark e uma função onFavorite para marcar ou desmarcar como favorito. 
// O componente BookmarkCard é responsável por exibir as informações do bookmark e fornecer botões para favoritar/desfavoritar e deletar o bookmark.
interface Bookmark {
  id: number;
  title: string;
  url: string;
  description: string | null;
  favorite: boolean;
  createdAt: string;
  tags: Tag[];
}

interface Props {
  bookmark: Bookmark;
  onDelete: (id: number) => void;
  onFavorite: (id: number, favorite: boolean) => void;
}

export default function BookmarkCard({ bookmark, onDelete, onFavorite }: Props) {
  const date = new Date(bookmark.createdAt).toLocaleDateString("pt-BR");

  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <span className={styles.title}>{bookmark.title}</span>
      </div>

      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {bookmark.url}
      </a>

      {bookmark.description && (
        <p className={styles.description}>{bookmark.description}</p>
      )}

      {bookmark.tags.length > 0 && (
        <div className={styles.tags}>
          {bookmark.tags.map(({ tag }) => (
            <span key={tag.id} className={styles.tag}>
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.date}>Salvo em {date}</span>

        <div className={styles.actions}>
          <button
            onClick={() => onFavorite(bookmark.id, !bookmark.favorite)}
            className={styles.favoriteButton}
            title={bookmark.favorite ? "Remover favorito" : "Favoritar"}
          >
            <svg
             xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             viewBox="0 0 24 24"
             fill={bookmark.favorite ? "#facc15" : "none"}
             stroke={bookmark.favorite ? "#facc15" : "#9ca3af"}
             strokeWidth="2"
         >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
</button>

          <button
            onClick={() => onDelete(bookmark.id)}
            className={styles.deleteButton}
            title="Deletar"
          >
            Deletar
          </button>
        </div>
      </div>

    </div>
  );
}
//Anotações pra estudo:
// O componente BookmarkCard é responsável por exibir as informações do bookmark e fornecer botões para favoritar/desfavoritar e 
// deletar o bookmark.
// Ele recebe um objeto bookmark com as informações do link, uma função onDelete para deletar o bookmark e uma função onFavorite para marcar ou desmarcar como favorito.
// O componente formata a data de criação do bookmark e exibe o título, URL, descrição e tags associadas. 
// Ele também inclui um botão para favoritar/desfavoritar o bookmark, que muda de cor quando marcado como favorito, e um botão para deletar o bookmark.
export interface CardModel {
  id: string;
  title: string;
}

export interface ColumnModel {
  id: string;
  title: string;
  cards: CardModel[];
}

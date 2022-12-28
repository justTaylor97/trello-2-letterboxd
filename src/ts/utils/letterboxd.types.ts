// Documentation at https://letterboxd.com/about/importing-data/
export type LetterboxdReviewCSV = {
  LetterboxdURI?: string;
  tmdbID?: number;
  imdbID?: string;
  Title?: string;
  Year?: number; // YYYY
  Directors?: string;
  Rating?: FiveStarRating;
  Rating10?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  WatchedDate?: string; // YYYY-MM-DD
  Rewatch?: boolean;
  Tags?: string[];
  Review?: string; // Text/HTML
};

export type FiveStarRating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export const isFiveStarRating = (rating: any): rating is FiveStarRating => {
  let something = typeof rating === "number";
  something = something && rating <= 5 && rating >= 0.5;
  something = something && rating % 0.5 === 0;

  return something;
};

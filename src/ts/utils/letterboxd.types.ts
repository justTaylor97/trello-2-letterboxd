export type LogEntryCreationRequestDiaryDetails = {};
export type LogEntryCreationRequestReview = {};

export type LogEntryCreationRequest = {
  filmId: string; // The film being logged.
  diaryDetails: LogEntryCreationRequestDiaryDetails; // Information about this log entry if adding to the member’s diary.
  review: LogEntryCreationRequestReview; // Information about the review if adding a review.
  tags: string[]; // The tags for the log entry.
  rating: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5; // Allowable values are between 0.5 and 5.0, with increments of 0.5.
  like: boolean; // Set to true if the member likes the review (via the ‘heart’ icon). A member may not like their own review.
  commentPolicy: "Anyone" | "Friends" | "You"; // The policy determining who can post comments to the log entry. You in this context refers to the content owner. Use the commentThreadState property of the ListRelationship to determine the signed-in member’s ability to comment (or not).
};

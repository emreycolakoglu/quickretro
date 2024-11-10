export enum RetrospectiveStages {
  NOT_STARTED = 0,
  WRITING = 1,
  VOTING = 2,
  GROUPING = 3,
  ACTIONING = 4,
  ENDED = 5,
}

export type CreateRetrospectiveRequestDto = {
  topic: string;
};

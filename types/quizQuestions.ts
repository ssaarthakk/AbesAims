export interface Questions {
    CO:               string;
    id:               number;
    type:             string;
    marks:            number;
    options:          string[];
    question:         string;
    topic_name:       string;
    bloom_level:      string;
    time_to_solve:    number;
    submitted_answer: null;
    multiple_correct: number;
}
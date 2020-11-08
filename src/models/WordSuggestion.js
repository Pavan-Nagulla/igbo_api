import mongoose from 'mongoose';
import { toJSONPlugin, toObjectPlugin } from './plugins';

const { Schema, Types } = mongoose;
const wordSuggestionSchema = new Schema({
  originalWordId: { type: Types.ObjectId, ref: 'Word', default: null },
  word: { type: String, required: true },
  wordClass: { type: String, required: true },
  definitions: {
    type: [{ type: String }],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  variations: { type: [{ type: String }], default: [] },
  examples: { type: [{ type: Types.ObjectId, ref: 'ExampleSuggestion' }], default: [] },
  editorsNotes: { type: String, default: '' },
  userComments: { type: String, default: '' },
  userEmail: { type: String, default: '' },
  approvals: { type: [{ type: String }], default: [] },
  denials: { type: [{ type: String }], default: [] },
  updatedOn: { type: Date, default: Date.now() },
  merged: { type: Types.ObjectId, ref: 'Word', default: null },
}, { toObject: toObjectPlugin });

toJSONPlugin(wordSuggestionSchema);

export default mongoose.model('WordSuggestion', wordSuggestionSchema);

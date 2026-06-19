import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    canonicalUrl: {
      type: String,
      trim: true,
    },

    ogTitle: {
      type: String,
      trim: true,
    },

    ogDescription: {
      type: String,
      trim: true,
    },

    ogImage: {
      type: String,
      trim: true,
    },

    twitterTitle: {
      type: String,
      trim: true,
    },

    twitterDescription: {
      type: String,
      trim: true,
    },

    twitterImage: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

export default seoSchema;

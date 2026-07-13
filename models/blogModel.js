import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Travel", "Resort", "Food", "Events", "Others"]
    },
    slug: {
      type: String,
      unique: true
    },
    coverImage: {
      type: String
    },
    published: {
      type: Boolean,
      default: false
    },
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

blogSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;

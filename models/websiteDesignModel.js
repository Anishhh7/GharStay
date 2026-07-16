import mongoose from 'mongoose';
import validator from 'validator';

const websiteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
    },
    logo: {
      type: String,
    },
    bannerImages: {
      type: [String],
      default: [],
    },
    contactEmail: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    contactPhone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message: 'Phone number must be exactly 10 digits',
      },
    },
    socialLinks: {
      facebook: {
        type: String,
        validate: {
          validator: (value) => !value || validator.isURL(value),
          message: 'Invalid facebook URL',
        },
      },
      instagram: {
        type: String,
        validate: {
          validator: (value) => !value || validator.isURL(value),
          message: 'Invalid Instagram URL',
        },
      },

      whatsapp: {
        type: String,
      },
    },

    footerText: {
      type: String,
    },
    theme: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Website =
  mongoose.models.Website || mongoose.model('Website', websiteSchema);

export default Website;

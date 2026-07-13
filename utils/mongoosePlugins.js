
export const globalTimestampFormatter = (schema) => {
// 1. Intercept options to guarantee virtual transmission
schema.set('toJSON', {
virtuals: true,
transform: (doc, ret) => {
delete ret.id; // Strip redundant alias properties cleanly
return ret;
}
});
schema.set('toObject', { virtuals: true });
// 2. Lazily calculate readable formatting context when requested
schema.virtual('readableCreatedAt').get(function() {
if (!this.createdAt) return null;
return new Date(this.createdAt).toLocaleString('en-US', {
dateStyle: 'medium',
timeStyle: 'short'
});
});
schema.virtual('readableUpdatedAt').get(function() {
if (!this.updatedAt) return null;
return new Date(this.updatedAt).toLocaleString('en-US', {
dateStyle: 'medium',
timeStyle: 'short'
});
});
};
import { publisherCategories } from "@/config/publisherCategories";

const publisherGroups = {};

for (const [publisher, category] of Object.entries(publisherCategories)) {
  if (!publisherGroups[category]) publisherGroups[category] = [];
  publisherGroups[category].push(publisher);
}

export default publisherGroups;

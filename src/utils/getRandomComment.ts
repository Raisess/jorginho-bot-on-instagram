import femaleComments from '../data/female.comment.json';

export const getRandomComment = (lastComment: string): string => {
	const comment: string = femaleComments[Math.round(Math.random() * femaleComments.length - 1)];

	if (comment != lastComment) {
		return comment;
	} else {
		return getRandomComment(lastComment);
	}
}


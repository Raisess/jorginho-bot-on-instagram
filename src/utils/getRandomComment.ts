import femaleComments from '../data/female.comment.json';
import maleComments from '../data/male.comment.json';
import otherComments from '../data/other.comment.json';

export const getRandomComment = (type: string, lastComment: string): string => {
	let commentsArr: Array<string> = [];

	if (type == 'female') {
		commentsArr = femaleComments;
	}	else if (type == 'male') {
		commentsArr = maleComments;
	}	else {
		commentsArr = otherComments;
	}

	const comment: string = commentsArr[Math.round(Math.random() * commentsArr.length - 1)];

	if (comment != lastComment) {
		return comment;
	} else {
		return getRandomComment(type, lastComment);
	}
}


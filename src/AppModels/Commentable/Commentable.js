import { helpers } from 'AppServices';

const Commentable = {
  addComment({ text }) {
    const { baseUrl } = this.constructor;
    this.checkInstanceExists();
    return helpers.requestJSON(`${baseUrl}/${this.props.id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment: { text } }),
    })
    .then(payload => {
      this.props.comments.push(payload);
      return this;
    });
  },
  updateComment({ text, commentId: comment_id }) {
    const { baseUrl } = this.constructor;
    this.checkInstanceExists();
    if (!comment_id) {
      throw new Error('Missing comment id');
    }
    return helpers.requestJSON(`${baseUrl}/${this.props.id}/comments/${comment_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ comment: { text } }),
    })
    .then(payload => {
      this.props.comments.push(payload);
      return this;
    });
  },
  removeComment({ commentId: comment_id }) {
    const { baseUrl } = this.constructor;
    this.checkInstanceExists();
    if (!comment_id) {
      throw new Error('Missing comment id');
    }
    return helpers.requestJSON(`${baseUrl}/${this.props.id}/comments/${comment_id}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.props.comments = this.props.comments.filter(c => comment_id !== c.id);
      return this;
    });
  },
};

export const makeCommentable = (instance) => {
  if (!instance.props.comments) {
    instance.props.comments = [];
  }
  Object.assign(instance, Commentable);
};

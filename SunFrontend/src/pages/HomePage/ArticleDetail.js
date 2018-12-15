import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './ArticleDetail.less';

@connect(({ articles, loading }) => ({
  article: articles.article,
  loading: loading.models.articles
}))
class ArticleDetail extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    const { params: { id } } = match;
    dispatch({
      type: 'articles/fetchOne',
      payload: {
        id
      },
    });
  }
  

  render() {
    const { article={} } = this.props;
    return (
      <div className={styles.page}>
        <div className={styles.time}>{moment(article.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        <h1>{article.title}</h1>
        
        <div 
          className={styles.body}
          // 使用 dangerouslySetInnerHTML可以使标签内的内容不被转义
          // 原本标签内的 {article.body} 就可以用下面的代替
          dangerouslySetInnerHTML={{__html: article.body}}
        />        
      </div>
      
    )
  }
}

export default ArticleDetail;

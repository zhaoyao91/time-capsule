import { Accounts } from 'meteor/accounts-base'

export default function () {
  Accounts.emailTemplates.siteName = '时光胶囊'
  // Accounts.emailTemplates.from  =

  Accounts.emailTemplates.resetPassword = {
    subject: () => '重置密码',
    html: (user, url) => `
      <p>您好，亲爱的时光胶囊用户：</p>
      <p>请点击以下链接或复制链接到浏览器打开以重置密码（如非本人操作请忽略）</p>
      <p>
        <a href="${url}">${url}</a>
      </p>
    `
  }
}
;(function (window, undefined) {
  function Toast (lines) {
    this.lines = lines || '打开APP进行点赞和评论';
    this.isShow = false;
  }
  Toast.prototype.getToast = function () {
    let toast = document.createElement('div');
    
    toast.setAttribute('id', 'toast');
    toast.innerText = this.lines;
    toast.style.cssText=`position: fixed;
                          width: 5rem;
                          height: 1.2rem;
                          line-height: 1.2rem;
                          font-size: 0.4rem;
                          border-radius: 0.2rem;
                          background-color: rgba(0, 0, 0, 0.6);
                          color: #fff;
                          left: 50%;
                          margin-left: -2.5rem;
                          top: 50%;
                          margin-top: -0.6rem;
                          text-align: center`;
    
    this.toast = toast;
  }
  Toast.prototype.show = function (delay) {
    let body = document.querySelector('body');

    if (!this.toast) {
      this.getToast();
    }

    if (this.isShow === false) {
      body.appendChild(this.toast);
      this.isShow = true;
      setTimeout(() => {
        this.hide();
      }, delay || 2000);
    }
  }
  Toast.prototype.hide = function () {
    let body = document.querySelector('body');
    let toast = document.querySelector('#toast');
    
    body.removeChild(toast);
    this.isShow = false;
  }

  let toast = new Toast();
  let talks = document.querySelector('#talks');
  let headerDetail = document.querySelector('#header-detail');

  talks.addEventListener('click', function (e) {
    var e = e || window.event;

    if (e.target && e.target.tagName.toLowerCase() === 'i' ) {
      toast.show();
    }
  }, false);

  headerDetail.addEventListener('click', function () {
    /show/.test(this.className)
    ? this.className = 'header--intro__detail detail-hide'
    : this.className = 'header--intro__detail detail-show';
  }, false);

} (window, undefined));
FROM zhaoyao91/meteor-tools

COPY . /src

RUN /tools/install_base.sh \
  && /tools/install_node.sh 4.8.3 \
  && /tools/install_meteor.sh \
  && /tools/build_app.sh /src /app \
  && /tools/prepare_app.sh /app \
  && /tools/cleanup.sh \
  && rm -rf /src

CMD /tools/run_app.sh /app

EXPOSE 80
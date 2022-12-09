$(document).ready(function () {
    $(".dropdown-menu a").on("click", function () {
      const selText = $(this).text();
      $("#display")
        .removeClass("none")
        .html("<p>" + selText + "</p>");
      if (selText == "Mostrar todos los gatos") {
        $("#display").obtenerTodo();
      }
      if (selText == "Mostrar un solo un gato") {
        $("#display").obtenerUno();
      }
      if (selText == "Actualizar comentarios a un gato") {
        $("#display").actualizarComentarios();
      }
      if (selText == "Crear un nuevo gato") {
        $("#display").crearGato();
      }
      if (selText == "Borrar un solo un gato") {
        $("#display").borrarUno();
      }
    });
  });
  
  $.fn.obtenerTodo = function () {
    $.getJSON("http://localhost:8080/gato", function (data) {
      $("#display").append("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
    });
  };
  
  $.fn.obtenerUno = function () {
    $("#display").append(
      '<input type="text" id="obtenerUno" name="name"  autocomplete="off" placeholder="id">\
          <button type="button" class="form-btn" id="unGato">Obten mi gato!</button>'
    );
  
    $("#unGato").on("click", function () {
      $.getJSON(
        "http://localhost:8080/gato/" + $("#obtenerUno").val(),
        function (data) {
          $("#display").html(
            "<p>Aqui esta tu gato!</p><pre>" +
              JSON.stringify(data, null, 2) +
              "</pre>"
          );
        }
      );
    });
  };
  
  $.fn.actualizarComentarios = function () {
    $("#display").append(
      '<input type="text" id="actualizarComentarios" name="id" placeholder="id" autocomplete="off">\
      <input type="text" id="comentario" name="comentario" placeholder="comentario" autocomplete="off">\
      <button type="button" class="form-btn" id="unComentario">Añadir comentario!</button>'
    );
  
    $("#unComentario").on("click", function () {
      $.ajax({
        url: "http://localhost:8080/gato/" + $("#actualizarComentarios").val(),
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ comentario: $("#comentario").val() }),
        success: function (data) {
          $("#display").html(
            "<p>Gracias por tu comentario! Aqui estan todos los comentarios.</p><pre>" +
              JSON.stringify(data.comentarios, null, 2) +
              "</pre>"
          );
        },
        error: function (error) {
          $("#display").html("<p>Gato invalido :(</p>");
        },
      });
    });
  };
  
  $.fn.crearGato = function () {
    $("#display").append(
      '<input type="text" id="id" name="id" placeholder="id" autocomplete="off">\
      <input type="text" id="nombre" name="nombre" placeholder="Nombre" autocomplete="off">\
      <input type="text" id="color" name="color" placeholder="Color" autocomplete="off">\
      <button type="submit" class="form-btn" id="nuevoGato">Crear nuevo gato!</button>'
    );
  
    $("#nuevoGato").on("click", function () {
      $.ajax({
        url: "http://localhost:8080/gato/",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ id: $("#id").val(),
                              nombre: $("#nombre").val(),
                              color: $("#color").val()}),
        success: function (data) {
          $("#display").html(
            "<p>Un nuevo gato se a creado!</p><pre>" +
              JSON.stringify(data, null, 2) +
              "</pre>"
          );
        },
        error: function (error) {
          $("#display").html("<p>Ha ocurrido un error :(</p>");
        },
      });
    });
  };
  
  $.fn.borrarUno = function () {
    $("#display").append(
      '<input type="text" id="borrarUno" name="id" placeholder="id" autocomplete="off">\
      <button type="click" class="form-btn" id="borrarUnoBtn">Borrar Gato!</button>'
    );
  
    $("#borrarUnoBtn").on("click", function () {
      $.ajax({
        url: "http://localhost:8080/gato/" + $("#borrarUno").val(),
        type: "delete",
        success: function (data) {
          $("#display").html(
            "<p>Gato Eliminado.</p><pre>" + JSON.stringify(data, null, 2) + "</pre>"
          );
        },
        error: function (error) {
          $("#display").html("<p>Ha ocurrido un error :(</p>");
        },
      });
    });
  };